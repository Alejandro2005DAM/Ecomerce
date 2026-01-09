import './Layout.css'

function Layout({children,bgcolor}){
    return(
        <div className="app-layout" style={{backgroundColor: bgcolor}}>
        {children}
        </div>
    )
}

export default Layout