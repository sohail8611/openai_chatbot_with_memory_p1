import openai
import os

openai.api_key = os.getenv('OPENAI_API_KEY')

def get_answer_from_gpt3(input_query,prev_conv):


    messages_ = [
        {"role": "system", "content": "You are a helpful assistant."},
        
        ]
    
    for i in prev_conv:
        messages_.append({"role":"user","content":i['user']})
        messages_.append({"role":"assistant","content":i['assistant']})
    
    messages_.append({"role": "user", "content": input_query})


    res = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages= messages_
    )

    return res['choices'][0]['message']['content']