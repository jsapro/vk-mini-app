import { FC } from 'react';
import {
	Panel,
	PanelHeader,
	Header,
	Button,
	Group,
	Cell,
	Div,
	Avatar,
	NavIdProps,
	Spacing,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface HomeProps extends NavIdProps {
	fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
	const { photo_200, city, first_name, last_name } = { ...fetchedUser };
	const routeNavigator = useRouteNavigator();

	return (
		<Panel id={id}>
			<PanelHeader>Главная</PanelHeader>
			{fetchedUser && (
				<Group header={<Header mode="secondary">Привет!!! 👋</Header>}>
					<Cell
						before={photo_200 && <Avatar src={photo_200} />}
						subtitle={city?.title}>
						{`${first_name} ${last_name}`}
					</Cell>
				</Group>
			)}

			<Group header={<Header mode="secondary"> Выбирай ❤</Header>}>
				<Div>
					<Button
						stretched
						size="l"
						mode="primary"
						onClick={() => routeNavigator.push('robots')}>
						{first_name}, здесь Futurama-style robots!
					</Button>
					<Spacing size={10} />
					<Button
						stretched
						size="l"
						mode="primary"
						onClick={() => routeNavigator.push('cats')}>
						А здесь факты о 🐈 🐈 🐈!
					</Button>
					<Spacing size={10} />
					<Button
						stretched
						size="l"
						mode="primary"
						onClick={() => routeNavigator.push('age')}>
						{first_name}, попробуй определить возраст по имени!
					</Button>
				</Div>
			</Group>
		</Panel>
	);
};
