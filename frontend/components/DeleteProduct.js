import { useMutation } from "@apollo/client"
import { DELETE_PRODUCT_MUTATION, UPDATE_PRODUCT_MUTATION } from "../lib/gql"

function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteProduct))
}

export default function DeleteProduct({ id, children }) {
    const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables: { id },
        update: update
    })

    return (
        <button type='button' disabled={loading} onClick={async () => {
            if (confirm("Are you sure you want to DELETE this item?")) {
                await deleteProduct()
            }
        }}>
            {children}
        </button>
    )
}

export function ArchiveProduct({ id, children }) {
    const [archiveProduct, { loading }] = useMutation(UPDATE_PRODUCT_MUTATION, {
        variables: {
            id,
            status: "Unavailable"
        },
        update: update
    })

    return (
        <button type='button' disabled={loading} onClick={async () => {
            if (confirm("Are you sure you want to ARCHIVE this item?")) {
                await archiveProduct()
            }
        }}>
            {children}
        </button>
    )
}
