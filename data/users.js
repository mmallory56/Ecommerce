import bcrypt from 'bcrypt'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'James',
        email: 'James@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin: true
    },
      {
        name: 'Jill',
        email: 'Jill@example.com',
       password:bcrypt.hashSync('123456',10),
       
    },  {
        name: 'Bob',
        email: 'Bob@example.com',
        password:bcrypt.hashSync('123456',10),
        
    },  {
        name: 'John',
        email: 'John@example.com',
        password:bcrypt.hashSync('123456',10),
       
    },

]

export default users