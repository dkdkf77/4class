from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request, url_for

app = Flask(__name__)


client = MongoClient('localhost', 27017)
db = client.Yanudu


@app.route('/')
def main():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/room')
def room():
    return render_template('room.html')

@app.route('/roomlist')
def roomlist():
    return render_template('roomlist.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

# add commit push
# 켜기 터미널
# set FLASK_APP=app.py
# set FLASK_ENV=development
# flask run
# 끄기 터미널에서 ctrl c