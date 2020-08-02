import React, { Component } from 'react'
import { CssBaseline } from '@material-ui/core'
import { Header, Footer } from './Layouts'
import Exercises from './Exercises'
import { fields, exercises } from '../store'
import { Provider } from '../context'

export default class extends Component {
  state = {
    exercises,
    exercise: {}
  }

  getExercisesByMuscles() {
    const initExercises = fields.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    )

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { fields } = exercise

        exercises[fields] = [...exercises[fields], exercise]

        return exercises
      }, initExercises)
    )
  }

  handleCategorySelect = category =>
    this.setState({
      category
    })

  handleExerciseSelect = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: false
    }))

  handleExerciseCreate = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise]
    }))

  handleExerciseDelete = id =>
    this.setState(({ exercises, exercise, editMode }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: exercise.id === id ? false : editMode,
      exercise: exercise.id === id ? {} : exercise
    }))

  handleExerciseSelectEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }))

  handleExerciseEdit = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [
        ...exercises.filter(ex => ex.id !== exercise.id),
        exercise
      ],
      exercise
    }))

  getContext = () => ({
    fields,
    ...this.state,
    exercisesByMuscles: this.getExercisesByMuscles(),
    onCategorySelect: this.handleCategorySelect,
    onCreate: this.handleExerciseCreate,
    onEdit: this.handleExerciseEdit,
    onSelectEdit: this.handleExerciseSelectEdit,
    onDelete: this.handleExerciseDelete,
    onSelect: this.handleExerciseSelect
  })

  render() {
    return (
      <Provider value={this.getContext()}>
        <CssBaseline />

        <Header />

        <Exercises />

        <Footer />
      </Provider>
    )
  }
}