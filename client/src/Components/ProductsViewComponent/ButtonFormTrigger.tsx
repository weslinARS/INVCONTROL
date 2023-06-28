
export function ButtonFormTrigger({triggerFunction}: {triggerFunction: any}) {
    return (
        <>
            <button className="btn btn-primary btn-sm" onClick={triggerFunction}>
                Insertar Producto
            </button>
        </>
  )
}
