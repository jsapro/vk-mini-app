import React, { useState, useRef, useEffect } from 'react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
	Button,
	NavIdProps,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Textarea,
	FormItem,
	FormField,
	FormLayoutGroup,
	Spacing,
} from '@vkontakte/vkui';

export const Cats: React.FC<NavIdProps> = ({ id }) => {
	const [fact, setFact] = useState<string>('');
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const routeNavigator = useRouteNavigator();

	const fetchFact = async () => {
		try {
			const response = await fetch('https://catfact.ninja/fact');
			const data = await response.json();
			setFact(data.fact);
			inputRef?.current?.focus();
		} catch (error) {
			console.error('Ошибка при получении факта:', error);
		}
	};

	useEffect(() => {
		if (inputRef.current) {
			const firstSpaceIndex = fact.trim().indexOf(' ');
			if (inputRef.current instanceof HTMLTextAreaElement) {
				inputRef.current.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
			}
		}
	}, [fact]);

	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
				Назад
			</PanelHeader>
			<FormLayoutGroup>
				<Spacing size={16} />
				<FormItem top="Узнайте факты о 🐈 🐈 🐈">
					<Button
						stretched
						size="l"
						onClick={fetchFact}
						type="submit"
						appearance="accent"
						mode="primary">
						Получить факт
					</Button>
				</FormItem>
				<Spacing size={16} />
				<FormItem>
					<FormField>
						<Textarea
							value={fact}
							getRef={inputRef}
							style={{ width: '100%', minHeight: '120px' }}
						/>
					</FormField>
				</FormItem>
			</FormLayoutGroup>
		</Panel>
	);
};
