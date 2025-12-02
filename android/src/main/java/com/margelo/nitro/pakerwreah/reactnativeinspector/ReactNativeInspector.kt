package com.margelo.nitro.pakerwreah.reactnativeinspector
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class ReactNativeInspector : HybridReactNativeInspectorSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
