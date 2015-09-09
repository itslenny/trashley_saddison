import json
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
  return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_path(path):
  return app.send_static_file(path)

@app.route('/stuff')
def stuff():
  stuff = {
    'artist1': 'Red Hot Chili Peppers',
    'artist2': 'Vampire Weekend',
    'artist3': 'Chicago'
  }

  return json.dumps(stuff)

app.run(debug=True)
