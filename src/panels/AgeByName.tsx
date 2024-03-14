import { useState, useEffect, FormEvent, ChangeEvent, FC } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
	NavIdProps,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FormLayoutGroup,
	FormItem,
	FormField,
	Button,
	Input,
	Paragraph,
	Spacing,
} from '@vkontakte/vkui';

export const AgeByName: FC<NavIdProps> = ({ id }) => {
	const [name, setName] = useState('');
	const [nameFromServer, setNameFromServer] = useState('');
	const [timerId, setTimerId] = useState<number>();
	const [age, setAge] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isValidInput, setIsValidInput] = useState(true);
	const [abortController, setAbortController] =
		useState<AbortController | null>(null);
	const routeNavigator = useRouteNavigator();

	const fetchAge = (controller: AbortController) => {
		if (!isValidInput) return;

		setAge('');

		const id = setTimeout(() => {
			fetch(`https://api.agify.io/?name=${name}`, {
				signal: controller.signal,
			})
				.then((response) => response.json())
				.then((data) => {
					setAge(data.age);
					setError(data.error);
					setNameFromServer(data.name);
					setIsLoading(false);
				})
				.catch((error) => {
					if (error.name === 'AbortError') {
						console.log('Fetch aborted');
					} else {
						console.error('Fetch error:', error);
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		}, 3000);

		setTimerId(id);
	};

	useEffect(() => {
		if (!name) return;

		const controller = new AbortController();
		setAbortController(controller);

		if (abortController) {
			abortController.abort();
		}

		fetchAge(controller);

		return () => {
			controller.abort();
			timerId && clearTimeout(timerId);
		};
	}, [name]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		const isValid = /^[A-Za-z]+$/.test(inputValue);
		setIsValidInput(isValid);
		setAge('');
		setError('');
		setName(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		abortController && fetchAge(abortController);
	};

	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
				Назад
			</PanelHeader>
			<form onSubmit={handleSubmit}>
				<FormLayoutGroup>
					<FormItem htmlFor="name" top="Определите возраст по имени">
						<FormField>
							<Input
								id="name"
								type="text"
								value={name}
								onChange={handleInputChange}
								placeholder="Введите имя"
								required
								pattern="[A-Za-zА-Яа-я]+"
								title="Пожалуйста, вводите только буквы"
								style={{ width: '100%' }}
							/>
						</FormField>
					</FormItem>
					<span style={{ color: '#c21799', height: '15px', padding: 20 }}>
						{age === null ? 'Попробуйте ввести другое имя' : ''}
					</span>
					<Spacing size={10} />
					<span style={{ color: '#c21799', height: '15px', padding: 20 }}>
						{error ? error : ''}
					</span>
					<Spacing size={16} />
					<div style={{ padding: 20 }}>
						<Paragraph>Возраст: {`  `}</Paragraph>
						{age ? (
							<Paragraph style={{ color: '#2d6df9', fontWeight: 'bold' }}>
								{age}
							</Paragraph>
						) : (
							<Paragraph style={{ color: '#2d6df9' }}>
								{name ? 'загрузка...' : ''}
							</Paragraph>
						)}
					</div>
					<Spacing size={50} />
					<FormItem>
						<Button
							disabled={!name || name === nameFromServer || !!error}
							type="submit"
							loading={isLoading}
							size="l"
							appearance="accent"
							mode="outline"
							stretched>
							Отправить
						</Button>
					</FormItem>
				</FormLayoutGroup>
			</form>
		</Panel>
	);
};
