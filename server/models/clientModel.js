const pool = require('../db');

const getAllClients = async () => {
  const { rows } = await pool.query('SELECT * FROM clients ORDER BY id ASC');
  return rows;
};

const getClientById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
  return rows[0];
};

const createClient = async (clientData) => {
  const { name, email, contract_number, contract_term, password } = clientData;
  const result = await pool.query(
    'INSERT INTO clients (name, email, contract_number, contract_term, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, contract_number, contract_term, password]
  );
  return result.rows[0];
};

const updateClient = async (id, clientData) => {
  const fields = ['name', 'email', 'contract_number', 'contract_term', 'password'];
  const updates = [];

  fields.forEach(field => {
    if (clientData[field]) {
      updates.push(`${field} = '${clientData[field]}'`);
    }
  });

  if (updates.length === 0) {
    throw new Error('No data to update');
  }

  const updateQuery = `UPDATE clients SET ${updates.join(', ')} WHERE id = $1 RETURNING *`;
  const result = await pool.query(updateQuery, [id]);
  return result.rows[0];
};

const deleteClient = async (id) => {
  const result = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
