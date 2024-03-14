import {
	createHashRouter,
	createPanel,
	createRoot,
	createView,
	RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
	HOME: 'home',
	ROBOTS: 'robots',
	CATS: 'cats',
	AGE: 'age',
} as const;

export const routes = RoutesConfig.create([
	createRoot(DEFAULT_ROOT, [
		createView(DEFAULT_VIEW, [
			createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
			createPanel(
				DEFAULT_VIEW_PANELS.ROBOTS,
				`/${DEFAULT_VIEW_PANELS.ROBOTS}`,
				[]
			),
			createPanel(DEFAULT_VIEW_PANELS.CATS, `/${DEFAULT_VIEW_PANELS.CATS}`, []),
			createPanel(DEFAULT_VIEW_PANELS.AGE, `/${DEFAULT_VIEW_PANELS.AGE}`, []),
		]),
	]),
]);

export const router = createHashRouter(routes.getRoutes());
