export interface MenuItem {

    title: string,
    href?: string,
    items?: MenuItem[]

}

export const mainMenuItems: MenuItem[] =  [
    {
        title: "Портфолио",
        href: '#'
    },
    {
        title: "О компании",
        href: '#'
    },{
        title: "Услуги",
        items: [
            { title: "Широкоформатная печать",  },
            { title: "Баннеры", href: '#'},
            { title: "Оклейка авто", href: '#' },
            { title: "Стритлайны", href: '#' },
            { title: "Плоттерная резка", href: '#' },
            { title: "Ролл-Ап Стенды", href: '#' },
            { title: "Ростовые фигуры", href: '#' },
            { title: "Информационный стенд", href: '#' },
            { title: "Таблички", href: '#' },
        ]
    },{
        title: "Цены",
        href: '#'
    },{
        title: "Контакты",
        href: '#'
    },
];