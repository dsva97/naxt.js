// size:        sm | md | lg -> by size
// type:        outline | filled  -> by color distribution
// radius:      normal | rounder | square -> by radius
// color:       any from css global variables
// background:  any from css global variables
export const Button = props => {
    const {
        size='md', 
        type='filled', 
        radius='normal', 
        color='', 
        background='', 
        className='', 
        children, 
        ...rest
    } = props
    const realClassName = [
        'btn',
        size?'btn-'+size:'',
        type?'btn-'+type:'',
        radius?'btn-'+radius:'',
        color,
        background?'bg-'+background:'',
        className
    ].filter(_class=>_class).join(' ')
    return (
        <button className={realClassName} {...rest}>
            { children }
        </button>
    )
}

export const BtnWarning = ({ children, ...props }) => (
    <Button background='warning' {...props}>
        { children }
    </Button>
)