import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { getPostsForUserApi, updatePost, deletePost, createPostAction } from '../store/actions/postsAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import './posts.css'

const Posts = ({isLoggedIn, dataUserPosts, getPostsForUserApi, updatePost, deletePost, createPostAction, intl}) => {
  const [ editPost, setEditPost ] = useState(null)
  const [ createPost, setCreatePost ] = useState(false)
  const [ show, setShow ] = useState(false)
  const [ textTitle, setTextTitle ] = useState('')
  const [ textBody, setTextBody ] = useState('')
  const { SearchBar } = Search
  const navigate = useNavigate()
  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true
    }, 
    {
      dataField: 'title',
      text: <FormattedMessage id="postTitle"/>,
      sort: true
    }, 
    {
      dataField: 'body',
      text: <FormattedMessage id="postBody"/>,
      sort: true,
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex, columnIndex2) => (
        <TruncateText cell={value} rowIndex={rowIndex} />
      ),
      formatter: (cell, row, rowIndex, columnIndex) => (
        <TruncateText cell={cell} rowIndex={rowIndex} />
      )
    }, {
      dataField: 'actions',
      text: <FormattedMessage id="actions"/>,
      formatter: (cell, row, rowIndex, columnIndex) => (
        <ActionButtons rowIndex={rowIndex} />
      ),
    }
  ]
  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }]
  
  useEffect(() => {
    if(!isLoggedIn){
      navigate("/")
    }
    getPostsForUserApi()
    // eslint-disable-next-line
  }, [])

  const handleClose = () => {
    setCreatePost(false)
    setEditPost(null)
    setTextTitle('')
    setTextBody('')
    setShow(false)
  }

  const handleDelete = (rowIndex) => {
    const dataEliminar = dataUserPosts[rowIndex]
    deletePost(dataEliminar.id)
  }

  const handleEdit = (rowIndex) => {
    const data = dataUserPosts[rowIndex]
    setEditPost(data)
    setTextTitle(data.title)
    setTextBody(data.body)
    setShow(true)
  }
  const handleCreate = () => {
    setCreatePost(true)
    setShow(true)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(textTitle !== '' && textBody !== '' ){
      const data = {
        title: textTitle,
        body: textBody
      }
      if (!createPost){
        updatePost(editPost.id, data)
        setEditPost(null)
      }else{
        createPostAction(data)
        setCreatePost(false)
      }
      setTextTitle('')
      setTextBody('')
      setShow(false)
    }
  }

  const handleEditorText = (event, editor) => {
    setTextBody(editor.getData())
  }

  const TruncateText = ({ cell, rowIndex }) => {
    const maxLength = 60;
  
    if (cell && cell.length > maxLength) {
      const truncatedText = cell.slice(0, maxLength) + '...';
      return <span>{truncatedText}</span>;
    }
  
    return <span>{cell}</span>;
  }

  const ActionButtons = ({ rowIndex }) => (
    <div>
      <Button variant="info" onClick={() => handleEdit(rowIndex)}><FormattedMessage id="edit"/></Button>
      {' '}
      <Button variant="danger" onClick={() => handleDelete(rowIndex)}><FormattedMessage id="delete"/></Button>
    </div>
  )
  function customMatchFunc({ searchText, value, column, row }) {
    if (typeof value !== 'undefined') { return value.startsWith(searchText); }
    return false;
  }

  return ( 
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleCreate}><FormattedMessage id="newPost"/>  </Button>
          <div className='DataTable'>
            <ToolkitProvider
              keyField="id"
              data={ dataUserPosts ? dataUserPosts : [] }
              columns={ columns }
              search={{customMatchFunc}}
            >
              {
                props => (
                  <div>
                    <SearchBar placeholder={intl.formatMessage({ id: 'searchBar' })} { ...props.searchProps } />
                    <BootstrapTable
                      bootstrap4
                      pagination={ paginationFactory() }
                      defaultSorted={ defaultSorted } 
                      loading={true}
                      { ...props.baseProps }
                    />
                  </div>
                )
              }
            </ToolkitProvider>
          </div>
          {(editPost || createPost) && 
            <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>{createPost ? <FormattedMessage id="create"/> : <FormattedMessage id="edit"/>}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label><FormattedMessage id="postTitle"/></Form.Label>
                    <Form.Control type="text" placeholder="" value={textTitle} onChange={(e) => setTextTitle(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label><FormattedMessage id="postBody"/></Form.Label>
                    {/* <Form.Control as="textarea" rows={3} value={textBody} onChange={(e) => setTextBody(e.target.value)}/> */}
                    <CKEditor
                      editor={ ClassicEditor }
                      data={textBody}
                      onChange={handleEditorText}
                    />
                  </Form.Group>
                  <div style={{float:"right"}}>
                    <Button variant="primary" type="submit">
                      {createPost ? <FormattedMessage id="savePost"/> : <FormattedMessage id="updatePost"/>}
                    </Button>{' '}
                    <Button variant="secondary" onClick={handleClose}>
                      <FormattedMessage id="closeModal"/>
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          }
        </Col>
      </Row>
    </Container>
  );
}
const mapStateToProps = ({session, posts}) => ({
  isLoggedIn: session.isLoggedIn,
  dataUserPosts: posts.dataUserPosts
})

const mapDispatchToProps = {
  getPostsForUserApi,
  updatePost,
  deletePost,
  createPostAction
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Posts));