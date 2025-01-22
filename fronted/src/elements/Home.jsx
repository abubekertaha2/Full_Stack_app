// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import ConfirmationModal from './ConfirmationModal';

// function Home() {
//     const [data, setData] = useState([]);
//     const [error, setError] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [studentToDelete, setStudentToDelete] = useState(null);

//     useEffect(() => {
//         axios.get('/students')
//             .then((res) => {
//                 setData(res.data);
//                 setError('');
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setError('Failed to fetch students.'); 
//             });
//     }, []);

//     const handleDelete = (id) => {
//         setStudentToDelete(id);
//         setShowModal(true);
//     };

//     const confirmDelete = () => {
//         axios.delete(`/delete/${studentToDelete}`)
//             .then(() => {
//                 setData((prevData) => prevData.filter(student => student.id !== studentToDelete));
//                 setShowModal(false); 
//                 setStudentToDelete(null);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 setError('Failed to delete student.');
//                 setShowModal(false);
//                 setStudentToDelete(null);
//             });
//     };

//     return (
//         <div className='container-fluid bg-secondary vh-100 vw-100'>
//             <h3>Students</h3>
//             <div className='d-flex justify-content-end'>
//                 <Link className='btn btn-success' to='/create'>Add Student</Link>
//             </div>
//             {error && <div className='alert alert-danger'>{error}</div>}
//             <table className='table'>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         data.map((student) => (
//                             <tr key={student.id}>
//                                 <td>{student.id}</td>
//                                 <td>{student.name}</td>
//                                 <td>{student.email}</td>
//                                 <td>{student.age}</td>
//                                 <td>{student.gender}</td>
//                                 <td>
//                                     <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Read</Link>
//                                     <Link className='btn mx-2 btn-success' to={`/edit/${student.id}`}>Edit</Link>
//                                     <button 
//                                         onClick={() => handleDelete(student.id)} 
//                                         className='btn mx-2 btn-danger' 
//                                         type='button'>
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </table>
//             <ConfirmationModal 
//                 show={showModal} 
//                 onConfirm={confirmDelete} 
//                 onCancel={() => setShowModal(false)} 
//             />
//         </div>
//     );
// }

// export default Home;
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import ConfirmationModal from './ConfirmationModal';

// function Home() {
//     const [data, setData] = useState([]);
//     const [error, setError] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [studentToDelete, setStudentToDelete] = useState(null);

//     // Fetch students on component mount
//     useEffect(() => {
//         axios.get('/students')
//             .then((res) => {
//                 const sortedData = res.data.sort((a, b) => a.name.localeCompare(b.name));
//                 setData(sortedData);
//                 setError('');
//             })
//             .catch((err) => {
//                 console.error(err);
//                 setError('Failed to fetch students.');
//             });
//     }, []);

//     // Handle adding a new student
//     const handleAddStudent = (newStudent) => {
//         const newId = data.length > 0 ? Math.max(...data.map(student => student.id)) + 1 : 1; // Generate new ID
//         const studentWithId = { ...newStudent, id: newId };
//         const updatedData = [...data, studentWithId].sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
//         setData(updatedData);
//     };

//     // Handle deleting a student
//     const handleDelete = (id) => {
//         setData(prevData => prevData.filter(student => student.id !== id));
//         setShowModal(false);
//         setStudentToDelete(null);
//     };

//     // Confirm delete action
//     const confirmDelete = () => {
//         handleDelete(studentToDelete);
//     };

//     return (
//         <div className='container-fluid bg-secondary vh-100 vw-100'>
//             <h3>Students</h3>
//             <div className='d-flex justify-content-end'>
//                 <Link className='btn btn-success' to='/create'>Add Student</Link>
//             </div>
//             {error && <div className='alert alert-danger'>{error}</div>}
//             <table className='table'>
//                 <thead>
//                     <tr>
//                         {/* <th>ID</th> */}
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         data.sort((a, b) => a.name.localeCompare(b.name)).map((student) => (
//                             <tr key={student.id}>
//                                 {/* <td>{student.id}</td> */}
//                                 <td>{student.name}</td>
//                                 <td>{student.email}</td>
//                                 <td>{student.age}</td>
//                                 <td>{student.gender}</td>
//                                 <td>
//                                     <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Read</Link>
//                                     <Link className='btn mx-2 btn-success' to={`/edit/${student.id}`}>Edit</Link>
//                                     <button 
//                                         onClick={() => {
//                                             setStudentToDelete(student.id);
//                                             setShowModal(true);
//                                         }} 
//                                         className='btn mx-2 btn-danger' 
//                                         type='button'>
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </table>
//             <ConfirmationModal 
//                 show={showModal} 
//                 onConfirm={confirmDelete} 
//                 onCancel={() => setShowModal(false)} 
//             />
//         </div>
//     );
// }

// export default Home;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

function Home() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    // Fetch students on component mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('/students');
                const sortedData = res.data.sort((a, b) => a.name.localeCompare(b.name));
                setData(sortedData);
                setError('');
            } catch (err) {
                console.error(err);
                setError('Failed to fetch students.');
            }
        };

        fetchStudents();
    }, []);

    // Handle adding a new student (if you want to use this function)
    const handleAddStudent = (newStudent) => {
        // This function can be implemented to add students
        // For now, it is a placeholder
    };

    // Handle deleting a student
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/delete/${id}`); // API call to delete student
            if (res.data.success) {
                setData(prevData => prevData.filter(student => student.id !== id));
            }
        } catch (err) {
            console.error(err);
            setError('Failed to delete student.');
        } finally {
            setShowModal(false);
            setStudentToDelete(null);
        }
    };

    // Confirm delete action
    const confirmDelete = () => {
        if (studentToDelete) {
            handleDelete(studentToDelete);
        }
    };

    return (
        <div className='container-fluid bg-secondary vh-100 vw-100'>
            <h3>Students</h3>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-success' to='/create'>Add Student</Link>
            </div>
            {error && <div className='alert alert-danger'>{error}</div>}
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.sort((a, b) => a.name.localeCompare(b.name)).map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>{student.gender}</td>
                                <td>
                                    <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Read</Link>
                                    <Link className='btn mx-2 btn-success' to={`/edit/${student.id}`}>Edit</Link>
                                    <button 
                                        onClick={() => {
                                            setStudentToDelete(student.id);
                                            setShowModal(true);
                                        }} 
                                        className='btn mx-2 btn-danger' 
                                        type='button'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ConfirmationModal 
                show={showModal} 
                onConfirm={confirmDelete} 
                onCancel={() => setShowModal(false)} 
            />
        </div>
    );
}

export default Home;