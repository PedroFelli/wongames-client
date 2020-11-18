import { screen } from '@testing-library/react'
import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard from '.'

const props = {
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 'R$ 235,00'
}

describe('<GameCard />', () => {
  it('should render correctly', () => {
    renderWithTheme(<GameCard {...props} />)

    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: props.developer })
    ).toBeInTheDocument()

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img
    )

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  }),
    it('should render price in label', () => {
      // renderiza o componente
      renderWithTheme(<GameCard {...props} />)
      const price = screen.getByText('R$ 235,00')

      // preço não tenha line-through
      expect(price).not.toHaveStyle({ textDecoration: 'line-through' })
      // preço tenha o background secundário
      expect(price).toHaveStyle({ backgroundColor: theme.colors.secondary })
    })

  it('should render a line-through in price when promotional', () => {
    // renderiza o componente (COM promotionalPrice) // 235 reais // 15 reais
    renderWithTheme(<GameCard {...props} promotionalPrice="R$ 15,00" />)

    // preço tenha line-through (235)
    expect(screen.getByText('R$ 235,00')).toHaveStyle({
      textDecoration: 'line-through'
    })
    // preço novo promocional não vai ter line-through (15)
    expect(screen.getByText('R$ 15,00')).not.toHaveStyle({
      textDecoration: 'line-through'
    })
  })

  it('should render a filleed Favorit icon when favorite is true', () => {
    renderWithTheme(<GameCard {...props} favorite />)

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })
})
