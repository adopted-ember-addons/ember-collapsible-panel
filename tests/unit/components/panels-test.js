import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('cp-panels', 'Unit | Component | panels', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  // unit: true
});

test('it renders', function(assert) {
  assert.expect(1);

  var component = this.subject();

  this.render('{{#cp-panels}} {{#cp-panel}} {{#cp-panel-toggle}}Hi{{/cp-panel-toggle}} {{#cp-panel-body}}<p>Hello</p>{{/cp-panel-body}} {{/cp-panel}} {{/cp-panels}}');
  // assert.equal(component._state, 'inDOM');
  debugger;
  assert.async();
});
