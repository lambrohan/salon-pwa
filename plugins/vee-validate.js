import Vue from 'vue'
import {
  ValidationProvider,
  extend,
  ValidationObserver,
  localize,
  configure,
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'

// install rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

// configure({
//   classes: {
//     valid: 'is-valid',
//     invalid: 'is-invalid',
//   },
// })

localize('en', en)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
