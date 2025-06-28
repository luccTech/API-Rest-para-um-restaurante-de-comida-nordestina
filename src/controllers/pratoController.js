const { Prato } = require('../models');

class PratoController {
  // Listar todos os pratos
  async listarTodos(req, res) {
    try {
      const { categoria, disponivel } = req.query;
      let whereClause = {};
      
      if (categoria) {
        whereClause.categoria = categoria;
      }
      
      if (disponivel !== undefined) {
        whereClause.disponivel = disponivel === 'true';
      }
      
      const pratos = await Prato.findAll({
        where: whereClause,
        order: [['nome', 'ASC']]
      });
      
      res.json({
        success: true,
        data: pratos,
        total: pratos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao listar pratos',
        message: error.message
      });
    }
  }

  // Buscar prato por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const prato = await Prato.findByPk(id);
      
      if (!prato) {
        return res.status(404).json({
          success: false,
          error: 'Prato não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: prato
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar prato',
        message: error.message
      });
    }
  }

  // Buscar pratos por categoria
  async buscarPorCategoria(req, res) {
    try {
      const { categoria } = req.params;
      const pratos = await Prato.findAll({
        where: { categoria },
        order: [['nome', 'ASC']]
      });
      
      res.json({
        success: true,
        data: pratos,
        total: pratos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar pratos por categoria',
        message: error.message
      });
    }
  }

  // Criar novo prato
  async criar(req, res) {
    try {
      const { nome, descricao, preco, categoria, imagem } = req.body;
      
      const prato = await Prato.create({
        nome,
        descricao,
        preco,
        categoria,
        imagem
      });
      
      res.status(201).json({
        success: true,
        message: 'Prato criado com sucesso',
        data: prato
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erro ao criar prato',
        message: error.message
      });
    }
  }

  // Atualizar prato
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco, categoria, disponivel, imagem } = req.body;
      
      const prato = await Prato.findByPk(id);
      
      if (!prato) {
        return res.status(404).json({
          success: false,
          error: 'Prato não encontrado'
        });
      }
      
      await prato.update({
        nome,
        descricao,
        preco,
        categoria,
        disponivel,
        imagem
      });
      
      res.json({
        success: true,
        message: 'Prato atualizado com sucesso',
        data: prato
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erro ao atualizar prato',
        message: error.message
      });
    }
  }

  // Deletar prato
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const prato = await Prato.findByPk(id);
      
      if (!prato) {
        return res.status(404).json({
          success: false,
          error: 'Prato não encontrado'
        });
      }
      
      await prato.destroy();
      
      res.json({
        success: true,
        message: 'Prato deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao deletar prato',
        message: error.message
      });
    }
  }

  // Alterar disponibilidade do prato
  async alterarDisponibilidade(req, res) {
    try {
      const { id } = req.params;
      const { disponivel } = req.body;
      
      const prato = await Prato.findByPk(id);
      
      if (!prato) {
        return res.status(404).json({
          success: false,
          error: 'Prato não encontrado'
        });
      }
      
      await prato.update({ disponivel });
      
      res.json({
        success: true,
        message: `Prato ${disponivel ? 'disponibilizado' : 'indisponibilizado'} com sucesso`,
        data: prato
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Erro ao alterar disponibilidade do prato',
        message: error.message
      });
    }
  }
}

module.exports = new PratoController(); 