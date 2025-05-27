from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('dados_agua.db')
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS leituras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            leitura INTEGER,
            status TEXT,
            tempo INTEGER,
            bombaLigada TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/api/dados', methods=['POST'])
def receber_dados():
    dados = request.json
    conn = sqlite3.connect('dados_agua.db')
    cur = conn.cursor()
    cur.execute('''
        INSERT INTO leituras (leitura, status, tempo, bombaLigada)
        VALUES (?, ?, ?, ?)
    ''', (dados['leitura'], dados['status'], dados['tempo'], dados['bombaLigada']))
    conn.commit()
    conn.close()
    return jsonify({"mensagem": "Dados salvos com sucesso!"}), 201

@app.route('/api/dados', methods=['GET'])
def listar_dados():
    conn = sqlite3.connect('dados_agua.db')
    cur = conn.cursor()
    cur.execute('SELECT * FROM leituras ORDER BY timestamp DESC LIMIT 50')
    dados = cur.fetchall()
    conn.close()
    return jsonify([
        {
            "id": row[0],
            "leitura": row[1],
            "status": row[2],
            "tempo": row[3],
            "bombaLigada": row[4],
            "timestamp": row[5]
        }
        for row in dados
    ])

@app.route('/')
def index():
    return "Servidor Flask ativo. Use /api/dados."

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)
