import React, { Component } from 'react';
import AuthService from '../../services/auth-service';

const withAuth = (WrappedComponent: any) => {
	class AuthenticationScreen extends Component<any, any> {

		private auth = AuthService;

		constructor(props: any) {
			super(props);

			this.state = {
				isAuthenticated: false
			};

			props.navigation.addListener('focus', async () => {
				await this.checkAuth();
			});
		}

		async getIsAuth(): Promise<boolean> {
			return new Promise((resolve, reject) => {
				this.auth.isAuth()
					.then(isLogged => resolve(isLogged))
					.catch(() => resolve(false));
			});
		};

		async checkAuth() {
			const result: boolean = await this.getIsAuth();
			if (result) {
				this.setState({
					isAuthenticated: true
				});
			}
			else {
				this.props.navigation.navigate('Slider');
			}
		};

		render() {
			if (!this.state.isAuthenticated) {
				return null;
			}
			return <WrappedComponent {...this.props} />;
		}
	}

	return AuthenticationScreen;
};

export default withAuth;
