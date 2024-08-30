export const Alert:any = ({ children, variant = 'info' }) => {
    const getStyle:any = () => {
        if(variant === 'error') {
            return {
                background: 'var(--alert-color)',
                color: '#fff',
                fontSize: 'var(--font-size-m)',
                padding: `var(--spacing-m)`
            };
        }

        return {
            background: 'var(--light-color)',
            fontSize: 'var(--font-size-m)',
            padding: `var(--spacing-m)`
        };
    };

    return <div style={getStyle()}>
        {children}
    </div>;
};