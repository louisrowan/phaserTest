require 'test_helper'

class MultiplayersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @multiplayer = multiplayers(:one)
  end

  test "should get index" do
    get multiplayers_url
    assert_response :success
  end

  test "should get new" do
    get new_multiplayer_url
    assert_response :success
  end

  test "should create multiplayer" do
    assert_difference('Multiplayer.count') do
      post multiplayers_url, params: { multiplayer: {  } }
    end

    assert_redirected_to multiplayer_url(Multiplayer.last)
  end

  test "should show multiplayer" do
    get multiplayer_url(@multiplayer)
    assert_response :success
  end

  test "should get edit" do
    get edit_multiplayer_url(@multiplayer)
    assert_response :success
  end

  test "should update multiplayer" do
    patch multiplayer_url(@multiplayer), params: { multiplayer: {  } }
    assert_redirected_to multiplayer_url(@multiplayer)
  end

  test "should destroy multiplayer" do
    assert_difference('Multiplayer.count', -1) do
      delete multiplayer_url(@multiplayer)
    end

    assert_redirected_to multiplayers_url
  end
end
