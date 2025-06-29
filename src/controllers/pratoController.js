const { Prato } = require('../models');

module.exports = {
  async listarTodos(req, res) {
    try {
      const pratos = await Prato.findAll({ order: [['id', 'ASC']] });
      res.json(pratos);
    } catch (error) {
      console.error('Erro ao listar pratos:', error);
      res.status(500).json({ error: 'Erro ao listar pratos' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const prato = await Prato.findByPk(req.params.id);
      if (!prato) {
        return res.status(404).json({ error: 'Prato não encontrado' });
      }
      res.json(prato);
    } catch (error) {
      console.error('Erro ao buscar prato:', error);
      res.status(500).json({ error: 'Erro ao buscar prato' });
    }
  },

  async criar(req, res) {
    try {
      const { nome, descricao, preco, categoria, disponivel } = req.body;
      
      // Validações
      if (!nome || !preco) {
        return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
      }
      
      // Validação do nome: apenas letras, mínimo 3 e máximo 50 caracteres
      if (!/^[a-zA-ZÀ-ÿ\s]{3,50}$/.test(nome)) {
        return res.status(400).json({ 
          error: 'Nome deve conter apenas letras, mínimo 3 e máximo 50 caracteres' 
        });
      }
      
      // Validação do preço: valor positivo
      if (preco <= 0) {
        return res.status(400).json({ error: 'Preço deve ser um valor positivo' });
      }
      
      const prato = await Prato.create({ 
        nome, 
        descricao, 
        preco, 
        categoria, 
        disponivel: disponivel !== undefined ? disponivel : true 
      });
      res.status(201).json(prato);
    } catch (error) {
      console.error('Erro ao criar prato:', error);
      res.status(500).json({ error: 'Erro ao criar prato' });
    }
  },

  async atualizar(req, res) {
    try {
      const { nome, descricao, preco, categoria, disponivel } = req.body;
      const prato = await Prato.findByPk(req.params.id);
      
      if (!prato) {
        return res.status(404).json({ error: 'Prato não encontrado' });
      }
      
      // Validações
      if (nome && !/^[a-zA-ZÀ-ÿ\s]{3,50}$/.test(nome)) {
        return res.status(400).json({ 
          error: 'Nome deve conter apenas letras, mínimo 3 e máximo 50 caracteres' 
        });
      }
      
      if (preco !== undefined && preco <= 0) {
        return res.status(400).json({ error: 'Preço deve ser um valor positivo' });
      }
      
      await prato.update({ nome, descricao, preco, categoria, disponivel });
      res.json(prato);
    } catch (error) {
      console.error('Erro ao atualizar prato:', error);
      res.status(500).json({ error: 'Erro ao atualizar prato' });
    }
  },

  async deletar(req, res) {
    try {
      const prato = await Prato.findByPk(req.params.id);
      if (!prato) {
        return res.status(404).json({ error: 'Prato não encontrado' });
      }
      
      await prato.destroy();
      res.json({ message: 'Prato deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar prato:', error);
      res.status(500).json({ error: 'Erro ao deletar prato' });
    }
  }
}; 