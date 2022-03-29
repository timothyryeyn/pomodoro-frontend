const { test, expect, it, beforeEach } = require('@jest/globals')
const { mount } = require('@vue/test-utils')
const { default: AppFormVue } = require('~/components/AppForm.vue')
const { default: AppFormButtonVue } = require('~/components/AppFormButton.vue')
const { default: AppFormFieldVue } = require('~/components/AppFormField.vue')
const { default: PomodoroTimerVue } = require('~/components/PomodoroTimer.vue')

describe('AppFormButton.vue', () => {
  const buttonText = 'Button Text'

  let wrapper

  beforeEach(() => {
    wrapper = mount(AppFormButtonVue, {
      slots: {
        default: buttonText,
      },
    })
  })

  test('displays text correctly', () => {
    expect(wrapper.find('button').text()).toBe(buttonText)
  })
})

describe('AppFormField.vue', () => {
  const type = 'text'
  const placeholder = 'Enter text here'
  const name = 'text-input'
  const label = 'Text Input Label'
  const value = 'Initial Value'

  let wrapper

  beforeEach(() => {
    wrapper = mount(AppFormFieldVue, {
      propsData: {
        type,
        placeholder,
        name,
        label,
        value,
      },
    })
  })

  it('has correct name', () => {
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })
})

describe('AppForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AppFormVue, {
      slots: {
        default: '<input type="text" name="sample-field">',
      },
    })
  })

  it('emits formSubmitted', () => {
    wrapper.trigger('submit')

    expect(wrapper.emitted()).toHaveProperty('formSubmitted')
  })
})

describe('PomodoroTimer.vue', () => {
  const time = {
    base: 300,
    formatted: '5:00',
  }

  let wrapper

  beforeEach(() => {
    wrapper = mount(PomodoroTimerVue, {
      propsData: {
        name: 'Sample Name',
        length: time.base,
      },
    })
  })

  it('displays correct time', () => {
    expect(wrapper.html()).toContain(time.formatted)
  })

  it('emits timerEvent', () => {
    wrapper.find('#start-button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('timerEvent')
  })
})
