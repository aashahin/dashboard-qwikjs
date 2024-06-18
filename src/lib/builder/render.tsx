import {component$} from "@builder.io/qwik";

interface ComponentDefinition {
    type: string;
    props?: any;
    child?: ComponentDefinition[];
    content?: string;
}

const structure = (component: ComponentDefinition): ComponentDefinition => ({
    type: component.type,
    props: component.props || {},
    child: component.child?.map(structure),
    content: component.content || '',
});

const renderComponent = component$<any>(({_Component, props}) => {
    return <_Component {...props}/>
})

export const MyButton = component$((props: any) => {
    return <button {...props}>{props.text}</button>;
});

const components: any = {
    button: MyButton,
}

const ComponentWrapper: any = component$<ComponentDefinition>((props) => {
    const component = structure(props);
    const Component = components[component.type];
    if (!Component) {
        return (
            <div class="bg-red-600 text-white text-xl p-4 border rounded w-max m-auto">
                <p>Component not found: {component.type}</p>
            </div>
        )
    }

    return (
        <>
            {renderComponent({
                props: component.props,
                _Component: Component,
            }, 'wrapper', 1)}

        </>
    );
});


const render = component$<ComponentDefinition>((props) => {
    const component = structure(props);
    const basicHtmlElements = new Set(['p', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'footer', 'header', 'main', 'section', 'article', 'aside', 'nav', 'form']);
    if (basicHtmlElements.has(component.type)) {
        const BasicElement$ = component.type;
        return (
            <BasicElement$>
                {component.child?.map((child, index) => (
                    render({
                        ...child,
                        key: index
                    }, '1', index)
                ))}
                {component.content}
            </BasicElement$>
        );
    } else {
        return (
            <ComponentWrapper {...props} />
        )
    }
});

export default render;