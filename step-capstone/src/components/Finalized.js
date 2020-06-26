function Finalized(props) {
    return (
        <Grid>
            {
                props.list.map((item) => {
                    return <TravelObject
                        key={item.id}
                        data={item}
                        onRemoveItem={props.onRemoveItem}
                        onEditItem={props.onEditItem}
                        onAddItem={props.onAddItem}
                    />
                })
            }
        </Grid>
    )
}