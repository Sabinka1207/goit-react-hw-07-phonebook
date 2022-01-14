import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
        contactsList: [],
        loading: false,
        filter: ""
    }

export const getContacts = createAsyncThunk("contacts/getContacts", async () => {
    try {
        const data = await fetch('https://61d32435b4c10c001712b7ec.mockapi.io/contacts')
        const res = await data.json()

        return res
    } catch (error) {
        console.log(error)
    }
})

export const addContact = createAsyncThunk("contacts/addContact", async (contactData) => { 
    try {
        const data = await fetch('https://61d32435b4c10c001712b7ec.mockapi.io/contacts', {
            method: 'POST',
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(contactData)
        })
        const res = await data.json()
        return res
    } catch (error) {
        console.log(error)
    }

})

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id) => { 
    try {
        const data = await fetch(`https://61d32435b4c10c001712b7ec.mockapi.io/contacts/${id}`, { method: 'DELETE' }) 
        const res = await data.json()
        return res
    } catch (error) {
        console.log(error)
    }
})

export const phoneBookSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        // remove: (state, action) => { state.contactsList = state.contactsList.filter((contact) => contact.id !== action.payload)},
        // add: (state, action) => {state.contactsList = action.payload},
        search: (state, action) => {state.filter = action.payload}
    },
    extraReducers: builder => { 
    builder.addCase(getContacts.pending, (state, _) => { 
        state.loading = true
    }).addCase(getContacts.fulfilled, (state, action) => { 
        state.loading = false
        state.contactsList = action.payload
    }).addCase(getContacts.rejected, (state, _) => { 
        state.loading = false
    }).addCase(addContact.fulfilled, (state, action) => { 
        state.contactsList.push(action.payload)
    }).addCase(deleteContact.fulfilled, (state, action) => { 
        state.contactsList = state.contactsList.filter((contact) => contact.id !== action.payload.id)
    })
}
})

export const { remove, add, search} = phoneBookSlice.actions
export const phoneBookReducer = phoneBookSlice.reducer