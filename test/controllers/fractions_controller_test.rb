require 'test_helper'

class FractionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fraction = fractions(:one)
  end

  test "should get index" do
    get fractions_url
    assert_response :success
  end

  test "should get new" do
    get new_fraction_url
    assert_response :success
  end

  test "should create fraction" do
    assert_difference('Fraction.count') do
      post fractions_url, params: { fraction: {  } }
    end

    assert_redirected_to fraction_url(Fraction.last)
  end

  test "should show fraction" do
    get fraction_url(@fraction)
    assert_response :success
  end

  test "should get edit" do
    get edit_fraction_url(@fraction)
    assert_response :success
  end

  test "should update fraction" do
    patch fraction_url(@fraction), params: { fraction: {  } }
    assert_redirected_to fraction_url(@fraction)
  end

  test "should destroy fraction" do
    assert_difference('Fraction.count', -1) do
      delete fraction_url(@fraction)
    end

    assert_redirected_to fractions_url
  end
end
