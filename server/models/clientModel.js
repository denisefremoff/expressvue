const pool = require('../db');
const { hashPassword } = require('../utils/passwordUtils');

const getAllClients = async () => {
  // const { rows } = await pool.query('SELECT * FROM clients ORDER BY id ASC');
  const { rows } = await pool.query('SELECT id, name, email, contract_number, contract_term FROM clients ORDER BY id ASC');
  return rows;
};

const getClientById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

const createClient = async (clientData) => {
  const { name, email, contract_number, contract_term, password } = clientData;

  // Хеширование пароля перед сохранением
  const hashedPassword = await hashPassword(password);

  const result = await pool.query(
    'INSERT INTO clients (name, email, contract_number, contract_term, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, email, contract_number, contract_term, hashedPassword]
  );
  return result.rows[0];
};

const updateClient = async (id, clientData) => {
  const fields = ['name', 'email', 'contract_number', 'contract_term', 'password'];
  const updates = [];
  const values = [];
  let index = 1;

  // Хеширование пароля, если он есть в обновлениях
  if (clientData.password) {
    clientData.password = await hashPassword(clientData.password);
  }

  fields.forEach(field => {
    if (clientData[field]) {
      updates.push(`${field} = $${index}`);
      values.push(clientData[field]);
      index++;
    }
  });

  if (updates.length === 0) {
    throw new Error('Нет данных для обновления');
  }

  const updateQuery = `UPDATE clients SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`;
  values.push(id);
  const result = await pool.query(updateQuery, values);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

const deleteClient = async (id) => {
  const result = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
