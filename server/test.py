import datetime as dt
import tkinter as tk
from tkinter import ttk
import mysql.connector as conexao

banco = conexao.connect(
    host='localhost',
    user='root',
    passwd='123',
    database='cad_ocorrencia'
)

lista_cad = ""

janela = tk.Tk()

def cadastrar_ocorrencia():
    nomeBuraco = entry_nomeBuraco.get()
    sendBy = entry_sendBy.get()
    address = entry_address.get()
    print('Nome do Buraco:'+nomeBuraco)
    print('Nome usuário:'+nomeBuraco)
    print('Endereço do buraco'+nomeBuraco)

    cursor = banco.cursor()
    comando_SQL = 'INSERT INTO ocorrencias (nome_buraco, sendBy, address) VALUES (%s,%s,%s)'
    dados = (str(nomeBuraco), str(sendBy), str(address))
    cursor.execute(comando_SQL, dados)
    banco.commit()

# titulo da janela

janela.title('Cadastro Principal')

label_nomeBuraco = tk.Label(text='Nome do Buraco')
label_nomeBuraco.grid(row=1, column=0, padx=10, pady=10, sticky='nswe', columnspan=4)

entry_nomeBuraco = tk.Entry()
entry_nomeBuraco.grid(row=2, column=0, padx=10, pady=10, sticky='nswe', columnspan=1)

label_sendBy = tk.Label(text='Nome usuário')
label_sendBy.grid(row=3, column=0, padx=10, pady=10, sticky='nswe', columnspan=4)

entry_sendBy = tk.Entry()
entry_sendBy.grid(row=4, column=0, padx=10, pady=10, sticky='nswe', columnspan=1)

label_address = tk.Label(text='Endereço do buraco')
label_address.grid(row=5, column=0, padx=10, pady=10, sticky='nswe', columnspan=4)

entry_address = tk.Entry()
entry_address.grid(row=6, column=0, padx=10, pady=10, sticky='nswe', columnspan=1)

botao_criar_codigo = tk.Button(text="Cadastrar ocorrencia", command=cadastrar_ocorrencia)
botao_criar_codigo.grid(row=7, column=0, padx=10, pady=10, sticky='nswe', columnspan=4)

janela.mainloop()