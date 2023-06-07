from flask import Flask, render_template, jsonify,request
import time,json
from utils import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/get_response',methods=['POST'])
def get_response():

    input_query = request.form.get('prompt')
    prev_conv = request.form.get('prev_conv')
    prev_conv = json.loads(prev_conv)
    print("prev_conv",prev_conv,flush=True)
    res = get_answer_from_gpt3(input_query,prev_conv)

    return jsonify({"success":"True","message":res})




if __name__ == '__main__':
    app.run(debug=True)