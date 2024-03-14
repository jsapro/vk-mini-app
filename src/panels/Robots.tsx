import { ChangeEvent, FC, FormEvent, useState } from 'react';
import {
	Button,
	Div,
	FormField,
	FormItem,
	FormLayoutGroup,
	Input,
	NavIdProps,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Placeholder,
	Spacing,
} from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export const Robots: FC<NavIdProps> = ({ id }) => {
	const [description, setDescription] = useState('');
	const [isLoaded, setIsLoaded] = useState(false);
	const [key, setkey] = useState('');
	const [descriptionToSend, setDescriptionToSend] = useState(
		Math.random().toFixed(2).toString()
	);
	const routeNavigator = useRouteNavigator();

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setDescription(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoaded(false);
		setkey(Math.random().toFixed(2));
		setDescriptionToSend(description);
	};

	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
				Robots in Futurama-style
			</PanelHeader>
			<Placeholder>
				<Div style={{ height: '200px' }}>
					<img
						width={200}
						src={`https://robohash.org/${descriptionToSend}.png?set=set1&size=200x200`}
						alt="random picture"
						onLoad={() => setIsLoaded(true)}
						key={key}
					/>
				</Div>
			</Placeholder>
			<form onSubmit={handleSubmit}>
				<FormLayoutGroup>
					<FormItem htmlFor="description" top="Создайте робота по описанию">
						<FormField>
							<Input
								id="description"
								type="text"
								value={description}
								onChange={handleInputChange}
								placeholder="Введите приметы робота)"
								required
								disabled={!isLoaded}
								style={{ width: '100%' }}
							/>
						</FormField>
					</FormItem>

					<Spacing size={10} />

					<FormItem>
						<Button
							disabled={!isLoaded}
							type="submit"
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
