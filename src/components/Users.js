import React, {useState, useEffect} from 'react'

const API = process.env.REACT_APP_API;

export const Users = () => {
    const[id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [editing, setEditing] = useState(false)

    const [users, setUsers] = useState([])

    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
        if(!editing){
            const res = await fetch(`${API}/users`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await res.json();
            console.log(data);
        } else {
            const res = await fetch(`${API}/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await res.json();
            console.log(data);
        }
        setEditing(false)
        clearInput();
        await getUsers();
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data)
    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Estás seguro?');
        if(userResponse){
            const res = await fetch(`${API}/user/${id}`, {
                method: 'DELETE'
            });
    
            const data = await res.json();
            console.log(data);
            await getUsers();
        }
    }

    const updateUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`);
        const data = await res.json();
        setEditing(true)
        setId(id)
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
    }

    const clearInput = () => {
        setId('')
        setName('');
        setEmail('');
        setPassword('');
    }

    useEffect(() =>{
        getUsers();
    }, [])

    return (
        <div className="row">
            <div className='col-md-4'>
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className='form-group p-2'>
                        <input type="text" 
                        onChange={e => setName(e.target.value)}
                        value={name}
                        className="form-control"
                        placeholder='Name'
                        autoFocus />
                    </div>
                    <div className='form-group p-2'>
                        <input type="text" 
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className="form-control"
                        placeholder='Email'/>
                    </div>
                    <div className='form-group p-2'>
                        <input type="text" 
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className="form-control"
                        placeholder='Password'/>
                    </div>
                    <button className='btn btn-primary btn-block'>
                        {editing ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className='col-md-8'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name} </td>
                                <td>{user.email} </td>
                                <td>{user.password} </td>
                                <td>
                                    <button 
                                        className='btn btn-secondary btn-sm btn-block'
                                        onClick={() => updateUser(user._id)}>
                                        Edit
                                    </button>
                                    <button 
                                        className='btn btn-danger btn-sm btn-block'
                                        onClick={() => deleteUser(user._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}