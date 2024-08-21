from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/configuracoes', methods=['GET'])
def get_configuracoes():
    tipo_jogo = request.args.get('tipo_jogo')
    orcamento = int(request.args.get('orcamento'))
    
    # Lógica para selecionar componentes com base no tipo de jogo e orçamento
    if tipo_jogo == 'pesado' and orcamento > 5000:
        configuracoes = {
            "CPU": "Intel Core i9",
            "GPU": "NVIDIA RTX 3080",
            "RAM": "32GB DDR4",
            "Armazenamento": "1TB SSD NVMe"
        }
    # Adicione outras condições conforme necessário

    return jsonify(configuracoes)

if __name__ == '__main__':
    app.run(debug=True)
