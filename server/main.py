from flask import request , jsonify
from config import app
from data import artistes_names
@app.route("/api", methods=["GET"]) 
def api():
    
    return jsonify({"message": artistes_names}),200

if __name__ == '__main__':
    app.run(debug=True)

