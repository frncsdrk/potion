test = require('tape')
{ Renaissance, r, Component } = require('../../dist/renaissance')

class TestPlugin
  constructor: (context) ->
    this.context = context
    this.meta = {}
    this

  getMeta: () ->
    this.meta

class TestAdapter
  constructor: () ->
    this

class TestComponent extends Component
  constructor: () ->
    super()
    this

class InitComponent extends Component
  constructor: () ->
    super()
    this

  init: () ->
    true

mixin = () =>
  true

test('Renaissance can be constructed', (t) =>
  t.ok(new Renaissance())
  t.end()
)

test('renaissance is ok', (t) =>
  t.ok(r)
  t.end()
)

test('register a plugin', (t) =>
  t.ok(r.registerPlugin('meta', TestPlugin))
  t.ok(r.meta)
  t.ok(typeof r.meta.getMeta() == 'object')
  t.end()
)

test('attempt to double register a plugin name', (t) =>
  t.notOk(r.registerPlugin('meta', TestPlugin))
  t.end()
)

test('register an adapter', (t) =>
  t.ok(r.registerAdapter('test', TestAdapter))
  t.ok(typeof r.adapters.test == 'object')
  t.end()
)

test('attempt to double register an adapter name', (t) =>
  t.notOk(r.registerAdapter('test', TestAdapter))
  t.end()
)

test('register a mixin on a component', (t) =>
  t.ok(r.registerMixin('test', TestComponent, mixin))
  component = new TestComponent()
  t.ok(typeof component.test == 'function')
  component2 = new TestComponent()
  t.ok(typeof component2.test == 'function')
  t.end()
)

test('attempt to double register a mixin name on a component', (t) =>
  t.notOk(r.registerMixin('test', TestComponent, mixin))
  t.end()
)

test('r.Component can be constructed', (t) =>
  t.ok(new Component())
  t.end()
)

test('r.Component.before', (t) =>
  component = new Component()
  component.before('foo', () => { })
  t.ok(Array.isArray(component._events['before.foo']))
  t.ok(typeof component._events['before.foo'][0] == 'function')
  t.equal(component._events['before.foo'].length, 1)
  t.ok(component.trigger('foo').before)
  component.before('foo', () => { })
  t.equal(component._events['before.foo'].length, 2)
  t.end()
)

test('r.Component.before - no callback', (t) =>
  component = new Component()
  t.notOk(component.before('foo'))
  t.end()
)

test('r.Component.on', (t) =>
  component = new Component()
  component.on('foo', () => { })
  t.ok(Array.isArray(component._events['foo']))
  t.ok(typeof component._events['foo'][0])
  t.equal(component._events['foo'].length, 1)
  t.ok(component.trigger('foo').event)
  component.on('foo', () => { })
  t.equal(component._events['foo'].length, 2)
  t.end()
)

test('r.Component.on - no callback', (t) =>
  component = new Component()
  t.notOk(component.on('foo'))
  t.end()
)

test('r.Component.after', (t) =>
  component = new Component()
  component.after('foo', () => { })
  t.ok(Array.isArray(component._events['after.foo']))
  t.ok(typeof component._events['after.foo'][0] == 'function')
  t.equal(component._events['after.foo'].length, 1)
  t.ok(component.trigger('foo').after)
  component.after('foo', () => { })
  t.equal(component._events['after.foo'].length, 2)
  t.end()
)

test('r.Component.after - no callback', (t) =>
  component = new Component()
  t.notOk(component.after('foo'))
  t.end()
)

test('r.Component init defined in class', (t) =>
  component = new InitComponent()
  t.ok(component.init())
  t.ok(typeof component._events['after.init'][0] == 'function')
  t.end()
)

test('r.Component.onInit - init defined and called after instantiation', (t) =>
  component = new Component()
  component.after('init', (component) =>
    component.foo = 'bar'
  )
  t.equal(component._events['after.init'].length, 1)
  t.ok(typeof component.onInit == 'function')
  result = component.onInit()
  t.ok(result.after)
  t.equal(component.foo, 'bar')
  t.end()
)
