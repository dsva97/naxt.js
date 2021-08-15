export const Button = ({ filled=true, rounded='rounded', size='md', color='blue', children, ...props }) => {
    const classes = (
        "btn-"+rounded + " " +
        "btn-type-"+(filled?'fill':'outline') + " " +
        "btn-size-"+size + " " +
        color
    )
    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}
