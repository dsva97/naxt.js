// type: full / normal / center
export const Container = ({ children, type='', ...props }) => (
    <div className={`container${type?'-'+type:''}`}  {...props}>
        { children }
    </div>
)