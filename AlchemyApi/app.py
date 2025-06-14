from flask import Flask, request, jsonify
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAI
from dotenv import load_dotenv
from cleaner import clean_and_parse_json
from flask_cors import CORS
app = Flask(__name__)
load_dotenv() 
CORS(app)
llm = GoogleGenerativeAI(model="gemini-2.5-flash-preview-04-17", temperature=0.8)

prompt_template = PromptTemplate(
    input_variables=["tx_json"],
    template="""
You're a sarcastic Web3 meme expert. Given the following JSON of transactions, roast the wallet's behavior.

Transactions:
{tx_json}

Based on this transaction history, output a JSON object in the following format (keep the field names exactly the same):
[

  "wallet_address": "<extracted_wallet_address>",

  "funky_title": "<funny summary title of their overall behavior>",

  "personality_sentences": [
    "<one-liner that roasts or reflects their trading personality>",
    "<another punchy observation>",
    "<one more satirical personality trait>"
  ],

  "wallet_health_score": <float score between 0 and 10 based on risk, wins/losses, behavior>,

  "failed_investments": [
    "<project name and reason it was a disaster>",
    "<another terrible investment>",
    "<include at least 2, max 5 entries>"
  ],

  "genuine_recommendations": [
    "<a serious but still snarky recommendation to improve trading behavior>",
    "<at least 2-4 suggestions>"
  ]
    ,
    
    "description": "<most painful or ridiculous transaction with token and brief description>",
    "tx_hash": "<tx hash>"
 
    "score": <integer between 0 and 100 representing how degen they are>,
    "percentile": "<string like 'Top 10% of most hopeless wallets'>"
    
]


Only output valid JSON (do not include explanations, markdown, or notes).
Do not include markdown or code blocks.
Your entire response must be only the raw JSON array — nothing else
"""
)

def group_by_category(transactions):
    categorized = {
        "external": [],
        "internal": [],
        "erc20": [],
        "erc721": [],
        "erc1155": [],
        "unknown": []
    }

    for tx in transactions:
        cat = tx.get("category")
        if cat in categorized:
            categorized[cat].append(tx)
        else:
            categorized["unknown"].append(tx)
    
    # Optional: sort each category by blockNum descending
    for cat in categorized:
        categorized[cat].sort(key=lambda x: int(x["blockNum"], 16), reverse=True)

    return categorized


@app.route("/analyze-transactions", methods=["POST"])
def analyze():
    data = request.get_json()
    txs = data.get("transfers", [])
    categorized_txs = group_by_category(txs)
    tx_json_str = str(categorized_txs)[:12000]  # Limit size to avoid token overload
    prompt = prompt_template.format(tx_json=tx_json_str)
    response = llm.invoke(prompt)
    print("LLM Response:", tx_json_str)
    return  clean_and_parse_json(response)
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(port=5000)
