import React, { Component } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@material-ui/core'

export default class extends Component {
  state = this.getInitState()

  getInitState() {
    const { exercise } = this.props

    return exercise
      ? exercise
      : {
          title: '',
          description: '',
          fields: ''
        }
  }

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    })

  handleSubmit = () =>
    this.props.onSubmit({
      id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
      ...this.state
    })

  render() {
    const { title, description, fields } = this.state,
      { exercise, fields: categories } = this.props

    return (
      <form>
        <TextField
          label="Title"
          value={title}
          onChange={this.handleChange('title')}
          margin="normal"
          fullWidth
        />
        <br />
        <FormControl fullWidth>
          <InputLabel htmlFor="fields">Fields</InputLabel>
          <Select value={fields} onChange={this.handleChange('fields')}>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <TextField
          multiline
          rows="4"
          label="Description"
          value={description}
          onChange={this.handleChange('description')}
          margin="normal"
          fullWidth
        />
        <br />
        <Button
          color="primary"
          variant="raised"
          onClick={this.handleSubmit}
          disabled={!title || !fields}
        >
          {exercise ? 'Edit' : 'Create'}
        </Button>
      </form>
    )
  }
}
