document.addEventListener('DOMContentLoaded', function() {
  // Ao carregar a página, lista os registros de clientes
  listarRegistros();

  // Seleciona o formulário e adiciona um listener para o evento de submit
  const form = document.getElementById('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de submit do formulário

    // Obtém os valores dos campos do formulário
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;

    if (id) {
      // Se houver um ID, atualiza o cliente existente
      fetch(`http://localhost:3000/cliente/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, endereco, telefone, email, cpf })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar cliente:', response.statusText);
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        listarRegistros();
        limparFormulario();
        alert('Cliente atualizado com sucesso!');
      })
      .catch(error => console.error('Erro ao atualizar cliente:', error));
    } else {
      // Se não houver ID, adiciona um novo cliente
      fetch('http://localhost:3000/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, endereco, telefone, email, cpf })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar cliente:', response.statusText);
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        listarRegistros();
        limparFormulario();
        alert('Cliente adicionado com sucesso!');
      })
      .catch(error => console.error('Erro ao adicionar cliente:', error));
    }
  });

  // Seleciona o botão de cancelar e adiciona um listener para limpar o formulário
  const btnCancelar = document.getElementById('btnCancelar');
  btnCancelar.addEventListener('click', function() {
    limparFormulario();
  });

  // Função para listar os registros de clientes
  function listarRegistros() {
    fetch('http://localhost:3000/cliente')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar clientes:', response.statusText);
        }
        return response.json();
      })
      .then(data => {
        let registrosHtml = '';
        data.forEach(cliente => {
          // Monta o HTML para exibir os dados de cada cliente
          registrosHtml += `
            <div class="registro bg-gray-200 p-4 rounded-md mb-4">
              <p class="text-lg font-semibold">Cliente ${cliente.id}</p>
              <p class="text-gray-600"><strong>Nome:</strong> ${cliente.nome}</p>
              <p class="text-gray-600"><strong>Endereço:</strong> ${cliente.endereco}</p>
              <p class="text-gray-600"><strong>Telefone:</strong> ${cliente.telefone}</p>
              <p class="text-gray-600"><strong>Email:</strong> ${cliente.email}</p>
              <p class="text-gray-600"><strong>CPF:</strong> ${cliente.cpf}</p>
              <div class="mt-2">
                <button class="btnEditar bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition duration-300 ease-in-out" onclick="editarCliente(${cliente.id})">Editar</button>
                <button class="btnExcluir bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition duration-300 ease-in-out" onclick="excluirCliente(${cliente.id})">Excluir</button>
              </div>
            </div>
          `;
        });
        // Insere o HTML gerado na div 'registros'
        document.getElementById('registros').innerHTML = registrosHtml;
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
        alert('Erro ao buscar clientes. Por favor, tente novamente.');
      });
  }

  // Função para editar um cliente
  window.editarCliente = function(id) {
    fetch(`http://localhost:3000/cliente/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar cliente para edição:', response.statusText);
        }
        return response.json();
      })
      .then(cliente => {
        // Atualiza os campos do formulário com os dados do cliente selecionado
        document.getElementById('id').value = cliente.id;
        document.getElementById('nome').value = cliente.nome;
        document.getElementById('endereco').value = cliente.endereco;
        document.getElementById('telefone').value = cliente.telefone;
        document.getElementById('email').value = cliente.email;
        document.getElementById('cpf').value = cliente.cpf;
      })
      .catch(error => {
        console.error('Erro ao buscar cliente para edição:', error);
        // Poderia adicionar feedback visual para o usuário aqui, se necessário
      });
  };

  // Função para excluir um cliente
  window.excluirCliente = function(id) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      fetch(`http://localhost:3000/cliente/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir cliente:', response.statusText);
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        listarRegistros();
        alert('Cliente excluído com sucesso!');
      })
      .catch(error => console.error('Erro ao excluir cliente:', error));
    }
  };

  // Função para limpar todos os campos do formulário
  function limparFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cpf').value = '';
  }

  // Função para pesquisar clientes pelo nome
  function pesquisar() {
    const nome = document.getElementById('pesquisa').value.trim();
    if (!nome) {
      alert('Por favor, insira um nome para pesquisar.');
      return;
    }

    fetch(`http://localhost:3000/clientes?nome=${encodeURIComponent(nome)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        let registrosHtml = '';
        data.forEach(cliente => {
          // Monta o HTML para exibir os dados dos clientes encontrados
          registrosHtml += `
            <div class="registro bg-gray-200 p-4 rounded-md mb-4">
              <p class="text-lg font-semibold">Cliente ${cliente.id}</p>
              <p class="text-gray-600"><strong>Nome:</strong> ${cliente.nome}</p>
              <p class="text-gray-600"><strong>Endereço:</strong> ${cliente.endereco}</p>
              <p class="text-gray-600"><strong>Telefone:</strong> ${cliente.telefone}</p>
              <p class="text-gray-600"><strong>Email:</strong> ${cliente.email}</p>
              <p class="text-gray-600"><strong>CPF:</strong> ${cliente.cpf}</p>
              <div class="mt-2">
                <button class="btnEditar bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition duration-300 ease-in-out" onclick="editarCliente(${cliente.id})">Editar</button>
                <button class="btnExcluir bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition duration-300 ease-in-out" onclick="excluirCliente(${cliente.id})">Excluir</button>
              </div>
            </div>
          `;
        });

        if (data.length === 0) {
          registrosHtml = '<p>Nenhum cliente encontrado.</p>';
        }

        // Insere o HTML gerado na div 'registros'
        document.getElementById('registros').innerHTML = registrosHtml;
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
        alert('Erro ao buscar clientes. Por favor, tente novamente.');
      });
  }

  // Adiciona um listener ao botão de pesquisar para acionar a função de pesquisa
  document.getElementById('btnPesquisar').addEventListener('click', pesquisar);
});
