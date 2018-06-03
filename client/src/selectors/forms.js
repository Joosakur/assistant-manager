import {createSelector} from 'reselect'

const selForms = state => state.form
const selForm = reduxFormName => createSelector(selForms, forms => forms[reduxFormName])
const selIsFormSubmitting = reduxFormName => createSelector(selForm(reduxFormName), form => form ? !!form.submitting : false)

export {
  selForms,
  selForm,
  selIsFormSubmitting
}
