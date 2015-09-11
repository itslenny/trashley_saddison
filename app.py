import json
import requests
import os
from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():
  return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_path(path):
  return app.send_static_file(path)

@app.route('/api/matches')
def matches():
  gender = request.args.get('want')
  ip = request.remote_addr
  people = getPeople(gender)
  location = getLocation(ip)

  data = {'people': json.loads(people),'location': json.loads(location)}
  return json.dumps(data)

@app.route('/api/quote')
def quote():
  fname = request.args.get('f')
  lname = request.args.get('l')
  return getQuote(fname,lname)


def getPeople(gender):
  url = 'http://api.randomuser.me/?results=12&gender='+gender+'&nat=us'
  return requests.get(url).text

def getLocation(ip):
  ip = '157.130.186.54'
  url = 'http://ip-api.com/json/'+ip
  return requests.get(url).text

def getQuote(fname,lname):
  url = 'http://api.icndb.com/jokes/random?firstName='+fname+'&lastName='+lname
  return requests.get(url).text

port = int(os.environ.get("PORT", 5000))
app.run(host='0.0.0.0', port=port, debug=True)
# app.run(debug=True)
