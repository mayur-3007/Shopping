import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../slices/cartSlice'
import { useGetAllProductsQuery } from '../slices/productsApi'
import { Stack, Grid, Container, Typography, Box } from '@mui/material'

const Home = () => {
  const { items: products, status } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data, error, isLoading } = useGetAllProductsQuery()
  console.log('Api', isLoading)

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    navigate('/cart')
  }

  return (
    <div className='home-container'>
      {status === 'success' ? (
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            {data &&
              data?.map((product) => (
                <Grid item md={3}>
                  <div key={product.handle} className='product'>
                    <Box
                      sx={{
                        width: 210,
                        height: 180,
                      }}
                    >
                      <Stack spacing={0} sx={{ p: 0 }}>
                        <img src={product.image_src} alt={product.title} />
                      </Stack>
                    </Box>
                    <Stack spacing={3} sx={{ p: 0 }}>
                      <Typography
                        variant='body1'
                        sx={{ textAlign: 'center', fontWeight: '700' }}
                      >
                        {product.title}
                      </Typography>
                      <div className='details'>
                        <span className='price'>${product.variant_price}</span>
                      </div>
                      <button onClick={() => handleAddToCart(product)}>
                        Add To Cart
                      </button>
                    </Stack>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Container>
      ) : status === 'pending' ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  )
}

export default Home
