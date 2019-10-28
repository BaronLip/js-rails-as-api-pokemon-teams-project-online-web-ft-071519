require "faker"
require "pry"

class PokemonsController < ApplicationController
    
    def index
        pokemons = Pokemon.all
        # render json: pokemons.to_json()
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(:id => params[:id])
        render json: PokemonSerializer.new(pokemon)
    end


    def create
        # binding.pry
        trainer = Trainer.find_by(:id => params[:trainer_id])
        
        if trainer.pokemons.count <= 6
            pokemon = Pokemon.create(
                :nickname => Faker::Name.first_name, 
                :species => Faker::Games::Pokemon.name,
                :trainer_id => params[:trainer_id]
            )
            render json: PokemonSerializer.new(pokemon)
        else
            render json: {error: "Too many pokemons, limit is 6."}, status: 403
        end
    end

    def destroy
        # Use "binding.pry" to see params passed from javascript action.
        pokemon = Pokemon.find_by(:id => params[:id])
        pokemon.destroy
        render json: PokemonSerializer.new(pokemon)
    end
end