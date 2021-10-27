import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ROUTE_AUTHOR_LIST } from '../../constants';
import { getAuthor, editAuthor } from '../../services/authors';

function AuthorEdit(props) {
    const history = useHistory();
    const { authorId } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const fetchArticle = async () => {
            const data = await getAuthor(authorId);
            setFirstName(data.firstName);
            setLastName(data.lastName);
        };

        fetchArticle();
    }, [authorId]);

    const handleSave = async () => {
        const payload = { firstName, lastName };
        await editAuthor(authorId, payload);
        history.push(ROUTE_AUTHOR_LIST);
    };

    return (
        <div className="AuthorEdit">
            <h1>Edit Article</h1>
            <Form>
                <Form.Group>
                    <Form.Label>firstName</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="firstName"
                        value={ firstName }
                        onChange={ (event) => setFirstName(event.target.value) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>lastName</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="lastName"
                        rows="5"
                        value={ lastName }
                        onChange={ (event) => setLastName(event.target.value) }
                    />
                </Form.Group>
                <Button variant="primary" onClick={ handleSave }>
                    Save Article
                </Button>
            </Form>
        </div>
    );
}

export default AuthorEdit;
