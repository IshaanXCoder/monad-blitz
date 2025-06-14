import json
import re

def clean_and_parse_json(raw_str: str):
    # Step 1: Remove markdown-style triple backticks and language hints like ```json or ```json\n
    cleaned = re.sub(r"```json\s*|```", "", raw_str, flags=re.IGNORECASE).strip()
    
    # Step 2: Parse the cleaned string as JSON
    try:
        data = json.loads(cleaned)
        return data
    except json.JSONDecodeError as e:
        print("JSON decoding error:", e)
        return None


# Example usage with your dummy string
dummy_output = '''```json
[
  {
    "wallet_address": "0x(StillLoadingTransactionHistory)",
    "funky_title": "The Apex Predator of Inactivity",
    "personality_sentences": [
      "This wallet's trading strategy? 'If you don't play, you can't lose.' They also can't win.",
      "So risk-averse, they make fiat look like a rollercoaster.",
      "Their biggest transaction was probably signing up for a MetaMask account and then forgetting the seed phrase."
    ],
    "wallet_health_score": 7.5,
    "failed_investments": [
      "The 'Buy Button': Repeatedly failed to click it, missing out on potential gains (and losses).",
      "Any potential investment ever: Successfully avoided every single one, thus failing to participate in the future."
    ],
    "genuine_recommendations": [
      "Maybe try sending $0.01 to yourself? Just to see if the buttons work.",
      "Consider a testnet. It's like training wheels for the blockchain, but you still have to pedal.",
      "Read literally anything about Web3. Knowledge is power, inaction is... well, this."
    ],
    "description": "The most painful 'transaction' was the crushing weight of inaction, watching the market from the sidelines with frozen fingers. No tokens involved, just existential dread.",
    "tx_hash": "0x(NotEvenAMiningFeeWasPaid)",
    "score": 0,
    "percentile": "Bottom 0% (Less active than cold storage)"
  }
]
```'''

result = clean_and_parse_json(dummy_output)
print(result)
