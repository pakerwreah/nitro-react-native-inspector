#include <jni.h>
#include "pakerwreah_reactnativeinspectorOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::pakerwreah_reactnativeinspector::initialize(vm);
}
