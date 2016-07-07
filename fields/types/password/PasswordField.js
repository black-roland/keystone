import React from 'react';
import Field from '../Field';
import { Button, FormInput, InputGroup } from 'elemental';

module.exports = Field.create({

	displayName: 'PasswordField',

	getInitialState () {
		return {
			passwordIsSet: this.props.value ? true : false,
			showChangeUI: this.props.mode === 'create' ? true : false,
			password: '',
			confirm: '',
		};
	},

	valueChanged (which, event) {
		var newState = {};
		newState[which] = event.target.value;
		this.setState(newState);
	},

	showChangeUI () {
		this.setState({
			showChangeUI: true,
		}, () => this.focus());
	},

	onCancel () {
		this.setState({
			showChangeUI: false,
		}, () => this.focus());
	},

	renderValue () {
		return <FormInput noedit>{this.props.value ? 'пароль установлен' : 'пароль не установлен'}</FormInput>;
	},

	renderField () {
		return this.state.showChangeUI ? this.renderFields() : this.renderChangeButton();
	},

	renderFields () {
		return (
			<InputGroup>
				<InputGroup.Section grow>
					<FormInput type="password" name={this.props.path} placeholder="Новый пароль" ref="focusTarget" value={this.state.password} onChange={this.valueChanged.bind(this, 'password')} autoComplete="off" />
				</InputGroup.Section>
				<InputGroup.Section grow>
					<FormInput type="password" name={this.props.paths.confirm} placeholder="Подтвердите пароль" value={this.state.confirm} onChange={this.valueChanged.bind(this, 'confirm')} autoComplete="off" />
				</InputGroup.Section>
				{this.state.passwordIsSet ? <InputGroup.Section><Button onClick={this.onCancel}>Отмена</Button></InputGroup.Section> : null}
			</InputGroup>
		);
	},

	renderChangeButton () {
		var label = this.state.passwordIsSet ? 'Изменить пароль' : 'Установить пароль';
		return (
			<Button ref="focusTarget" onClick={this.showChangeUI}>{label}</Button>
		);
	},

});
